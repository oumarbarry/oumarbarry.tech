// s/o @_pi0_
// Based on original source from https://github.com/pi0/space-invaders/blob/main/index.ts
// By Pooya Parsa <https://github.com/pi0>

export interface InvadersOptions {
  selector?: string
  canvas?: HTMLCanvasElement
  width?: number
  height?: number
  autoPlay?: boolean
  title?: string
}

export function startGame(options: InvadersOptions = {}) {
  // ###################################################################
  // Constants
  // ###################################################################
  const IS_CHROME
    = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
  const CANVAS_WIDTH = options.width || 640
  const CANVAS_HEIGHT = options.height || 640
  const SPRITE_SHEET_SRC
    = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAEACAYAAAADRnAGAAACGUlEQVR42u3aSQ7CMBAEQIsn8P+/hiviAAK8zFIt5QbELiTHmfEYE3L9mZE9AAAAqAVwBQ8AAAD6THY5CgAAAKbfbPX3AQAAYBEEAADAuZrC6UUyfMEEAIBiAN8OePXnAQAAsLcmmKFPAQAAgHMbm+gbr3Sdo/LtcAAAANR6GywPAgBAM4D2JXAAABoBzBjA7AmlOx8AAEAzAOcDAADovTc4vQim6wUCABAYQG8QAADd4dPd2fRVYQAAANQG0B4HAABAawDnAwAA6AXgfAAAALpA2uMAAABwPgAAgPoAM9Ci/R4AAAD2dmqcEQIAIC/AiQGuAAYAAECcRS/a/cJXkUf2AAAAoBaA3iAAALrD+gIAAADY9baX/nwAAADNADwFAADo9YK0e5FMX/UFACA5QPSNEAAAAHKtCekmDAAAAADvBljtfgAAAGgMMGOrunvCy2uCAAAACFU6BwAAwF6AGQPa/XsAAADYB+B8AAAAtU+ItD4OAwAAAFVhAACaA0T7B44/BQAAANALwGMQAAAAADYO8If2+P31AgAAQN0SWbhFDwCAZlXgaO1xAAAA1FngnA8AACAeQPSNEAAAAM4CnC64AAAA4GzN4N9NSfgKEAAAAACszO26X8/X6BYAAAD0Anid8KcLAAAAAAAAAJBnwNEvAAAA9Jns1ygAAAAAAAAAAAAAAAAAAABAQ4COCENERERERERERBrnAa1sJuUVr3rsAAAAAElFTkSuQmCC"
  const LEFT_KEY = 37
  const RIGHT_KEY = 39
  const SHOOT_KEY = 83 /* S key */
  const TEXT_BLINK_FREQ = 500
  const PLAYER_CLIP_RECT = { x: 0, y: 204, w: 62, h: 32 }
  const ALIEN_BOTTOM_ROW = [
    { x: 0, y: 0, w: 51, h: 34 },
    { x: 0, y: 102, w: 51, h: 34 },
  ]
  const ALIEN_MIDDLE_ROW = [
    { x: 0, y: 137, w: 50, h: 33 },
    { x: 0, y: 170, w: 50, h: 34 },
  ]
  const ALIEN_TOP_ROW = [
    { x: 0, y: 68, w: 50, h: 32 },
    { x: 0, y: 34, w: 50, h: 32 },
  ]
  const ALIEN_X_MARGIN = 40
  const ALIEN_SQUAD_WIDTH = 11 * ALIEN_X_MARGIN

  interface ClipRect { x: number, y: number, w: number, h: number }

  // ###################################################################
  // Utility functions & classes
  // ###################################################################
  function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min
  }

  function clamp(num: number, min: number, max: number) {
    return Math.min(Math.max(num, min), max)
  }

  function valueInRange(value: number, min: number, max: number) {
    return value <= max && value >= min
  }

  function checkRectCollision(A: ClipRect, B: ClipRect) {
    const xOverlap
      = valueInRange(A.x, B.x, B.x + B.w) || valueInRange(B.x, A.x, A.x + A.w)

    const yOverlap
      = valueInRange(A.y, B.y, B.y + B.h) || valueInRange(B.y, A.y, A.y + A.h)
    return xOverlap && yOverlap
  }

  class Point2D {
    x: number
    y: number

    constructor(x: number, y: number) {
      this.x = typeof x === "undefined" ? 0 : x
      this.y = typeof y === "undefined" ? 0 : y
    }

    set(x: number, y: number) {
      this.x = x
      this.y = y
    }
  }

  class Rect {
    x: number
    y: number
    w: number
    h: number

    constructor(x: number, y: number, w: number, h: number) {
      this.x = typeof x === "undefined" ? 0 : x
      this.y = typeof y === "undefined" ? 0 : y
      this.w = typeof w === "undefined" ? 0 : w
      this.h = typeof h === "undefined" ? 0 : h
    }

    set(x: number, y: number, w: number, h: number) {
      this.x = x
      this.y = y
      this.w = w
      this.h = h
    }
  }

  // ###################################################################
  // Globals
  // ###################################################################
  let canvas: HTMLCanvasElement
  let ctx: CanvasRenderingContext2D
  let spriteSheetImg: HTMLImageElement
  let bulletImg: HTMLImageElement
  let keyStates: boolean[] = []
  let prevKeyStates: boolean[] = []
  let lastTime = 0
  let player: Player
  let aliens: Enemy[] = []
  let particleManager: ParticleExplosion
  let updateAlienLogic = false
  let alienDirection = -1
  let alienYDown = 0
  let alienCount = 0
  let wave = 1
  let hasGameStarted = false

  // ###################################################################
  // Entities
  // ###################################################################
  class BaseSprite {
    img: HTMLImageElement
    position: Point2D
    scale: Point2D
    bounds: Rect
    doLogic: boolean
    constructor(img: HTMLImageElement, x: number, y: number) {
      this.img = img
      this.position = new Point2D(x, y)
      this.scale = new Point2D(1, 1)
      this.bounds = new Rect(x, y, this.img.width, this.img.height)
      this.doLogic = true
    }

    update(_dt: number) {}

    _updateBounds() {
      this.bounds.set(
        this.position.x,
        this.position.y,
        ~~(0.5 + this.img.width * this.scale.x),
        ~~(0.5 + this.img.height * this.scale.y),
      )
    }

    _drawImage() {
      ctx.drawImage(this.img, this.position.x, this.position.y)
    }

    draw(_resized: boolean) {
      this._updateBounds()
      this._drawImage()
    }
  }

  class SheetSprite extends BaseSprite {
    clipRect: ClipRect

    constructor(
      sheetImg: HTMLImageElement,
      clipRect: ClipRect,
      x: number,
      y: number,
    ) {
      super(sheetImg, x, y)
      this.clipRect = clipRect
      this.bounds.set(x, y, this.clipRect.w, this.clipRect.h)
    }

    update(_dt: any) {}

    _updateBounds() {
      const w = ~~(0.5 + this.clipRect.w * this.scale.x)
      const h = ~~(0.5 + this.clipRect.h * this.scale.y)
      this.bounds.set(this.position.x - w / 2, this.position.y - h / 2, w, h)
    }

    _drawImage() {
      ctx.save()
      ctx.transform(
        this.scale.x,
        0,
        0,
        this.scale.y,
        this.position.x,
        this.position.y,
      )
      ctx.drawImage(
        this.img,
        this.clipRect.x,
        this.clipRect.y,
        this.clipRect.w,
        this.clipRect.h,
        ~~(0.5 + -this.clipRect.w * 0.5),
        ~~(0.5 + -this.clipRect.h * 0.5),
        this.clipRect.w,
        this.clipRect.h,
      )
      ctx.restore()
    }

    draw(resized: boolean) {
      super.draw(resized)
    }
  }

  class Player extends SheetSprite {
    lives: number
    xVel: number
    bullets: any[]
    bulletDelayAccumulator: number
    score: number
    constructor() {
      super(
        spriteSheetImg,
        PLAYER_CLIP_RECT,
        CANVAS_WIDTH / 2,
        CANVAS_HEIGHT - 70,
      )
      this.scale.set(0.85, 0.85)
      this.lives = 3
      this.xVel = 0
      this.bullets = []
      this.bulletDelayAccumulator = 0
      this.score = 0
    }

    reset() {
      this.lives = 3
      this.score = 0
      this.position.set(CANVAS_WIDTH / 2, CANVAS_HEIGHT - 70)
    }

    shoot() {
      const bullet = new Bullet(
        this.position.x,
        this.position.y - this.bounds.h / 2,
        1,
        1000,
      )
      this.bullets.push(bullet)
      // playSound("shoot")
    }

    handleInput() {
      if (isKeyDown(LEFT_KEY))
        this.xVel = -175
      else if (isKeyDown(RIGHT_KEY))
        this.xVel = 175
      else this.xVel = 0

      if (wasKeyPressed(SHOOT_KEY)) {
        if (this.bulletDelayAccumulator > 0.5) {
          this.shoot()
          this.bulletDelayAccumulator = 0
        }
      }
    }

    updateBullets(dt: number) {
      for (let i = this.bullets.length - 1; i >= 0; i--) {
        let bullet = this.bullets[i]
        if (bullet.alive) {
          bullet.update(dt)
        }
        else {
          this.bullets.splice(i, 1)
          bullet = undefined
        }
      }
    }

    update(dt: number) {
      // update time passed between shots
      this.bulletDelayAccumulator += dt

      // apply x vel
      this.position.x += this.xVel * dt

      // cap player position in screen bounds
      this.position.x = clamp(
        this.position.x,
        this.bounds.w / 2,
        CANVAS_WIDTH - this.bounds.w / 2,
      )
      this.updateBullets(dt)
    }

    draw(resized: boolean) {
      super.draw(resized)

      // draw bullets
      for (let i = 0, len = this.bullets.length; i < len; i++) {
        const bullet = this.bullets[i]
        if (bullet.alive)
          bullet.draw(resized)
      }
    }
  }

  class Bullet extends BaseSprite {
    direction: number
    speed: number
    alive: boolean

    constructor(x: number, y: number, direction: number, speed: number) {
      super(bulletImg, x, y)
      this.direction = direction
      this.speed = speed
      this.alive = true
    }

    update(dt: number) {
      this.position.y -= this.speed * this.direction * dt

      if (this.position.y < 0)
        this.alive = false
    }

    draw(resized: boolean) {
      super.draw(resized)
    }
  }

  class Enemy extends SheetSprite {
    clipRects: ClipRect[]
    onFirstState: boolean
    stepDelay: number
    stepAccumulator: number
    doShoot: boolean
    bullet?: Bullet
    alive: boolean

    constructor(clipRects: ClipRect[], x: number, y: number) {
      super(spriteSheetImg, clipRects[0], x, y)
      this.clipRects = clipRects
      this.scale.set(0.5, 0.5)
      this.alive = true
      this.onFirstState = true
      this.stepDelay = 1 // try 2 secs to start with...
      this.stepAccumulator = 0
      this.doShoot = false
      this.bullet = undefined
    }

    toggleFrame() {
      this.onFirstState = !this.onFirstState
      this.clipRect = this.onFirstState ? this.clipRects[0] : this.clipRects[1]
    }

    shoot() {
      this.bullet = new Bullet(
        this.position.x,
        this.position.y + this.bounds.w / 2,
        -1,
        500,
      )
    }

    update(dt: number) {
      this.stepAccumulator += dt

      if (this.stepAccumulator >= this.stepDelay) {
        if (this.position.x < this.bounds.w / 2 + 20 && alienDirection < 0)
          updateAlienLogic = true

        if (
          alienDirection === 1
          && this.position.x > CANVAS_WIDTH - this.bounds.w / 2 - 20
        ) {
          updateAlienLogic = true
        }

        if (this.position.y > CANVAS_WIDTH - 50)
          reset()

        // const fireTest = Math.floor(Math.random() * (this.stepDelay + 1))
        if (getRandomArbitrary(0, 1000) <= 5 * (this.stepDelay + 1))
          this.doShoot = true

        this.position.x += 10 * alienDirection
        this.toggleFrame()
        this.stepAccumulator = 0
      }
      this.position.y += alienYDown

      if (this.bullet && this.bullet.alive)
        this.bullet.update(dt)
      else
        this.bullet = undefined
    }

    draw(resized: boolean) {
      super.draw(resized)
      if (this.bullet !== undefined && this.bullet.alive)
        this.bullet.draw(resized)
    }
  }

  class ParticleExplosion {
    particlePool: any[]
    particles: any[]

    constructor() {
      this.particlePool = []
      this.particles = []
    }

    draw() {
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const particle = this.particles[i]
        particle.moves++
        particle.x += particle.xunits
        particle.y += particle.yunits + particle.gravity * particle.moves
        particle.life--

        if (particle.life <= 0) {
          if (this.particlePool.length < 100)
            this.particlePool.push(this.particles.splice(i, 1))
          else
            this.particles.splice(i, 1)
        }
        else {
          ctx.globalAlpha = particle.life / particle.maxLife
          ctx.fillStyle = particle.color
          ctx.fillRect(particle.x, particle.y, particle.width, particle.height)
          ctx.globalAlpha = 1
        }
      }
    }

    createExplosion(
      x: number,
      y: number,
      color: string,
      number: number,
      width: number,
      height: number,
      spd: number,
      grav: number,
      lif: number,
    ) {
      for (let i = 0; i < number; i++) {
        const angle = Math.floor(Math.random() * 360)
        const speed = Math.floor((Math.random() * spd) / 2) + spd
        const life = Math.floor(Math.random() * lif) + lif / 2
        const radians = (angle * Math.PI) / 180
        const xunits = Math.cos(radians) * speed
        const yunits = Math.sin(radians) * speed

        if (this.particlePool.length > 0) {
          const tempParticle = this.particlePool.pop()
          tempParticle.x = x
          tempParticle.y = y
          tempParticle.xunits = xunits
          tempParticle.yunits = yunits
          tempParticle.life = life
          tempParticle.color = color
          tempParticle.width = width
          tempParticle.height = height
          tempParticle.gravity = grav
          tempParticle.moves = 0
          tempParticle.alpha = 1
          tempParticle.maxLife = life
          this.particles.push(tempParticle)
        }
        else {
          this.particles.push({
            x,
            y,
            xunits,
            yunits,
            life,
            color,
            width,
            height,
            gravity: grav,
            moves: 0,
            alpha: 1,
            maxLife: life,
          })
        }
      }
    }
  }

  // ###################################################################
  // Initialization functions
  // ###################################################################
  function initCanvas() {
    if (options.canvas) {
      canvas = options.canvas
    }
    else {
      const selector = options.selector || "#invaders"
      const el = document.querySelector(selector) || document.body
      canvas = document.createElement("canvas")
      el.appendChild(canvas)
    }

    // Set canvas properties
    canvas.width = CANVAS_WIDTH
    canvas.height = CANVAS_HEIGHT

    // Get Context
    ctx = canvas.getContext("2d") as CanvasRenderingContext2D

    // turn off image smoothing
    setImageSmoothing(false)

    // create our main sprite sheet img
    spriteSheetImg = new Image()
    spriteSheetImg.src = SPRITE_SHEET_SRC
    preDrawImages()

    // add event listeners and initially resize
    window.addEventListener("resize", resize)
    document.addEventListener("keydown", onKeyDown)
    document.addEventListener("keyup", onKeyUp)
  }

  function preDrawImages() {
    const canvas = drawIntoCanvas(2, 8, (ctx) => {
      ctx.fillStyle = "white"
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    })
    bulletImg = new Image()
    bulletImg.src = canvas.toDataURL()
  }

  function setImageSmoothing(value: boolean) {
    ctx.imageSmoothingEnabled = value
    // @ts-expect-error moz
    ctx.mozImageSmoothingEnabled = value
    // @ts-expect-error oimage
    ctx.oImageSmoothingEnabled = value
    // @ts-expect-error webkit
    ctx.webkitImageSmoothingEnabled = value
    // @ts-expect-error msimage
    ctx.msImageSmoothingEnabled = value
  }

  function initGame() {
    aliens = []
    player = new Player()
    particleManager = new ParticleExplosion()
    setupAlienFormation()
    drawBottomHud()
  }

  function setupAlienFormation() {
    alienCount = 0
    for (let i = 0, len = 5 * 11; i < len; i++) {
      const gridX = i % 11
      const gridY = Math.floor(i / 11)
      let clipRects: ClipRect[] = []
      switch (gridY) {
        case 0:
        case 1:
          clipRects = ALIEN_BOTTOM_ROW
          break
        case 2:
        case 3:
          clipRects = ALIEN_MIDDLE_ROW
          break
        case 4:
          clipRects = ALIEN_TOP_ROW
          break
      }
      aliens.push(
        new Enemy(
          clipRects,
          CANVAS_WIDTH / 2
          - ALIEN_SQUAD_WIDTH / 2
          + ALIEN_X_MARGIN / 2
          + gridX * ALIEN_X_MARGIN,
          CANVAS_HEIGHT / 3.25 - gridY * 40,
        ),
      )
      alienCount++
    }
  }

  function reset() {
    aliens = []
    setupAlienFormation()
    player.reset()
  }

  function init() {
    initCanvas()
    keyStates = []
    prevKeyStates = []
    resize()
  }

  // ###################################################################
  // Helpful input functions
  // ###################################################################
  function isKeyDown(key: number) {
    return keyStates[key]
  }

  function wasKeyPressed(key: number) {
    return !prevKeyStates[key] && keyStates[key]
  }

  // ###################################################################
  // Drawing & Update functions
  // ###################################################################
  function updateAliens(dt: number) {
    if (updateAlienLogic) {
      updateAlienLogic = false
      alienDirection = -alienDirection
      alienYDown = 25
    }

    for (let i = aliens.length - 1; i >= 0; i--) {
      let alien: Enemy | undefined = aliens[i]
      if (!alien.alive) {
        aliens.splice(i, 1)
        alien = undefined
        alienCount--
        if (alienCount < 1) {
          wave++
          setupAlienFormation()
        }
        return
      }

      alien.stepDelay = (alienCount * 20 - wave * 10) / 1000
      if (alien.stepDelay <= 0.05)
        alien.stepDelay = 0.05

      alien.update(dt)

      if (alien.doShoot) {
        alien.doShoot = false
        alien.shoot()
        // const rand = String(Math.round(Math.random() * 3 + 1)) as
        //   | "1"
        //   | "2"
        //   | "3"
        // playSound(`fastinvader${rand}`)
      }
    }
    alienYDown = 0
  }

  function resolveBulletEnemyCollisions() {
    const bullets = player.bullets

    for (let i = 0, len = bullets.length; i < len; i++) {
      const bullet = bullets[i]
      for (let j = 0, alen = aliens.length; j < alen; j++) {
        const alien = aliens[j]
        if (checkRectCollision(bullet.bounds, alien.bounds)) {
          alien.alive = bullet.alive = false
          // playSound("invaderkilled")
          particleManager.createExplosion(
            alien.position.x,
            alien.position.y,
            "white",
            70,
            5,
            5,
            3,
            0.15,
            50,
          )
          player.score += 25
        }
      }
    }
  }

  function resolveBulletPlayerCollisions() {
    for (let i = 0, len = aliens.length; i < len; i++) {
      const alien = aliens[i]
      if (
        alien.bullet
        && checkRectCollision(alien.bullet.bounds, player.bounds)
      ) {
        if (player.lives === 0) {
          hasGameStarted = false
        }
        else {
          // playSound("explosion")
          alien.bullet.alive = false
          particleManager.createExplosion(
            player.position.x,
            player.position.y,
            "green",
            100,
            8,
            8,
            6,
            0.001,
            40,
          )
          player.position.set(CANVAS_WIDTH / 2, CANVAS_HEIGHT - 70)
          player.lives--
          break
        }
      }
    }
  }

  function resolveCollisions() {
    resolveBulletEnemyCollisions()
    resolveBulletPlayerCollisions()
  }

  function updateGame(dt: number) {
    player.handleInput()
    prevKeyStates = keyStates.slice()
    player.update(dt)
    updateAliens(dt)
    resolveCollisions()
  }

  function drawIntoCanvas(
    width: number,
    height: number,
    drawFunc: (ctx: CanvasRenderingContext2D) => void,
  ) {
    const canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
    drawFunc(ctx)
    return canvas
  }

  function fillText(
    text: string,
    x: number,
    y: number,
    color?: string,
    fontSize?: number,
  ) {
    if (typeof color !== "undefined")
      ctx.fillStyle = color
    if (typeof fontSize !== "undefined")
      ctx.font = `${fontSize}px Play`
    ctx.fillText(text, x, y)
  }

  function fillCenteredText(
    text: string,
    x: number,
    y: number,
    color?: string,
    fontSize?: number,
  ) {
    const metrics = ctx.measureText(text)
    fillText(text, x - metrics.width / 2, y, color, fontSize)
  }

  function fillBlinkingText(
    text: string,
    x: number,
    y: number,
    blinkFreq: number,
    color?: string,
    fontSize?: number,
  ) {
    if (~~(0.5 + Date.now() / blinkFreq) % 2)
      fillCenteredText(text, x, y, color, fontSize)
  }

  function drawBottomHud() {
    ctx.fillStyle = "#02ff12"
    ctx.fillRect(0, CANVAS_HEIGHT - 30, CANVAS_WIDTH, 2)
    fillText(`${player.lives} x `, 10, CANVAS_HEIGHT - 7.5, "white", 20)
    ctx.drawImage(
      spriteSheetImg,
      player.clipRect.x,
      player.clipRect.y,
      player.clipRect.w,
      player.clipRect.h,
      45,
      CANVAS_HEIGHT - 23,
      player.clipRect.w * 0.5,
      player.clipRect.h * 0.5,
    )
    fillText("CREDIT: ", CANVAS_WIDTH - 115, CANVAS_HEIGHT - 7.5)
    fillCenteredText(`SCORE: ${player.score}`, CANVAS_WIDTH / 2, 20)
    fillBlinkingText(
      "00",
      CANVAS_WIDTH - 25,
      CANVAS_HEIGHT - 7.5,
      TEXT_BLINK_FREQ,
    )
  }

  function drawAliens(resized: boolean) {
    for (let i = 0; i < aliens.length; i++) {
      const alien = aliens[i]
      alien.draw(resized)
    }
  }

  function drawGame(resized: boolean) {
    player.draw(resized)
    drawAliens(resized)
    particleManager.draw()
    drawBottomHud()
  }

  function drawStartScreen() {
    fillCenteredText(
      options.title || "Space Invaders",
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT / 2.75,
      "#FFFFFF",
      36,
    )
    fillCenteredText(
      "Press enter to play! Use S to shoot.",
      CANVAS_WIDTH / 1.7,
      CANVAS_HEIGHT / 2,
      "#FFFFFF",
      26,
    )
  }

  function animate() {
    const now = window.performance.now()
    let dt = now - lastTime
    if (dt > 100)
      dt = 100
    if (wasKeyPressed(13) && !hasGameStarted) {
      initGame()
      hasGameStarted = true
    }

    if (hasGameStarted)
      updateGame(dt / 1000)

    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    if (hasGameStarted)
      drawGame(false)
    else
      drawStartScreen()

    lastTime = now
    requestAnimationFrame(animate)
  }

  // ###################################################################
  // Event Listener functions
  // ###################################################################
  function resize() {
    const w = window.innerWidth
    const h = window.innerHeight

    // calculate the scale factor to keep a correct aspect ratio
    const scaleFactor = Math.min(w / CANVAS_WIDTH, h / CANVAS_HEIGHT)

    if (IS_CHROME) {
      canvas.width = CANVAS_WIDTH * scaleFactor
      canvas.height = CANVAS_HEIGHT * scaleFactor
      setImageSmoothing(false)
      ctx.transform(scaleFactor, 0, 0, scaleFactor, 0, 0)
    }
    else {
      // resize the canvas css properties
      canvas.style.width = `${CANVAS_WIDTH * scaleFactor}px`
      canvas.style.height = `${CANVAS_HEIGHT * scaleFactor}px`
    }
  }

  function onKeyDown(e: KeyboardEvent) {
    // e.preventDefault()
    keyStates[e.keyCode] = true
  }

  function onKeyUp(e: KeyboardEvent) {
    e.preventDefault()
    keyStates[e.keyCode] = false
  }

  // ###################################################################
  // Touch Support
  // ###################################################################
  interface TouchPos { x: number, y: number }
  let touchStart: TouchPos

  document.addEventListener("touchstart", (e) => {
    touchStart = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    }
    if (hasGameStarted) {
      player.shoot()
    }
    else {
      initGame()
      hasGameStarted = true
    }
  })

  document.addEventListener("touchmove", (e) => {
    const touchCurrent = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    }
    const deltaX = touchCurrent.x - touchStart.x
    if (deltaX > 0) {
      keyStates[RIGHT_KEY] = true
      keyStates[LEFT_KEY] = false
    }
    else if (deltaX < 0) {
      keyStates[LEFT_KEY] = true
      keyStates[RIGHT_KEY] = false
    }
  })

  document.addEventListener("touchend", () => {
    keyStates[LEFT_KEY] = false
    keyStates[RIGHT_KEY] = false
  })

  // ###################################################################
  // Start game!
  // ###################################################################
  const styleEl = document.createElement("link")
  styleEl.rel = "stylesheet"
  styleEl.href = "https://fonts.googleapis.com/css?family=Play:400,700"

  document.head.appendChild(styleEl)

  init()
  animate()

  if (options.autoPlay) {
    initGame()
    hasGameStarted = true
  }
}

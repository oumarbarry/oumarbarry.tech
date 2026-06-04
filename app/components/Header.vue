<template>
  <header class="site-header">
    <NuxtLink to="/" class="brand-mark" aria-label="Oumar Barry home">
      <Logo class="h-7 w-12" />
    </NuxtLink>

    <nav class="site-nav" aria-label="Primary">
      <NuxtLink to="/blog" class="nav-link">Blog</NuxtLink>

      <NuxtLink
        to="https://github.com/oumarbarry"
        target="_blank"
        class="icon-link"
        aria-label="GitHub"
      >
        <Icon name="carbon:logo-github" size="19px" />
      </NuxtLink>
    </nav>
  </header>
</template>

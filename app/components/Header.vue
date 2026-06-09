<template>
  <header class="site-header">
    <div class="site-rails header-rails">
      <NuxtLink to="/" class="site-brand">[oumarbarry.tech]</NuxtLink>

      <nav class="site-nav" aria-label="Primary">
        <NuxtLink to="/blog" class="nav-link">Blog</NuxtLink>

        <NuxtLink
          to="https://github.com/oumarbarry"
          target="_blank"
          class="icon-link"
          aria-label="GitHub"
        >
          <Icon name="carbon:logo-github" size="17px" />
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

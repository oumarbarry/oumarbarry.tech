<template>
  <header class="flex items-center justify-between px-5 py-5 lg:px-30 md:px-10">
    <NuxtLink to="/">
      <Logo class="h-12 w-12" />
    </NuxtLink>

    <div class="flex items-center gap-x-8">
      <NuxtLink
        to="https://oumarbarry.notion.site/Oumar-Barry-4c46c1855f244f61b8f122837f19dda7"
        target="_blank"
        class="text-gray-500 no-underline transition-all duration-150 ease-in-out hover:text-black"
      >
        Projects
      </NuxtLink>

      <NuxtLink
        to="https://github.com/oumarbarry"
        target="_blank"
        class="flex items-center justify-center"
      >
        <Icon
          name="carbon:logo-github"
          size="25px"
          class="text-gray-500 transition-all duration-150 ease-in-out hover:text-black"
        />
      </NuxtLink>
    </div>
  </header>
</template>

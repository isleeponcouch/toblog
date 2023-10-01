<template>
  <div class="m-4 md:m-12">


      <div class="text-center">
        <p class="my-2 text-lg font-medium">Hi 👋 – My name is Tobi, this is my blog where I write mostly about Swift and iOS related topics.</p>
      </div>
    
    <ul class="my-10">
      <li v-for="article of articles" :key="article.slug" class="p-4 md:p-12 text-white font-thin my-3" v-bind:class="article.bg">
        <NuxtLink :to="{ name: 'slug', params: { slug: article.slug } }">
          <div>
            <h4 class="max-w-4xl mx-auto text-xl md:text-4xl text-thin text-center">{{ article.title }}</h4>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    async asyncData({ $content, params }) {
      const articles = await $content('articles')
        .only(['title', 'slug', 'bg'])
        .sortBy('createdAt', 'desc')
        .fetch()

      return {
        articles
      }
    }
  }
</script>
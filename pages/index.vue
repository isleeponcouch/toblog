<template>
  <div class="m-12 space-y-8">
    <div class="space-y-2 text-center">
    	<h1 class="text-2xl font-thin">Sometimes I code. Other times I make croissants and things like that.</h1>
    	<p class="text-1xl font-medium">Here things are written. The value of the things is questionable.</p>
    </div>
    <ul>
      <li v-for="article of articles" :key="article.slug" class="p-12 text-5xl text-white font-thin my-3" v-bind:class="article.bg">
        <NuxtLink :to="{ name: 'slug', params: { slug: article.slug } }">
          <div>
            <h4 class="max-w-4xl mx-auto text-4xl text-thin text-center">{{ article.title }}</h4>
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
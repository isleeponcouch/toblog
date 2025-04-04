<template>
  <div class="m-1 md:m-12">
      <div class="text-center">
        <p class="my-2 text-lg text-gray-300 font-medium">👋 Hi, I'm Tobias and this is my blog where I write mostly about native mobile and backend web development.</p>
        <p class="my-2 text-lg text-gray-300 font-medium">🤷‍♂️ This is mostly just a place for me to think out loud, though I try to write in a way that others might find useful.</p>
        <p class="my-2 text-lg text-gray-300 font-medium">🇦🇺 I'm based in Brisbane, Australia.</p>
      </div>
    <ul class="my-10">
      <li v-for="article of articles" :key="article.slug" class="p-4 md:p-12 text-white font-thin my-1 md:my-3">
        <NuxtLink :to="{ name: 'slug', params: { slug: article.slug } }">
          <div class="text-center">
            <h4 class="max-w-4xl mx-auto text-lg md:text-2xl text-thin inline-block p-2 mb-2 rounded underline" v-bind:class="article.decoration">{{ article.title }}</h4>
            <p>{{ formatDate(article.createdAt) }}</p>
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
        .only(['title', 'slug', 'bg', 'decoration', 'createdAt'])
        .sortBy('createdAt', 'desc')
        .fetch()

      return {
        articles
      }
    }, methods: {
      formatDate(date) {
          const options = { year: 'numeric', month: 'long', day: 'numeric' }
          return new Date(date).toLocaleDateString('en', options)
      }
    }
  }
</script>
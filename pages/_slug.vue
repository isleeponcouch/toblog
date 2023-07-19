<script>
  export default {
    async asyncData({ $content, params }) {
		const article = await $content('articles', params.slug).fetch()
      	return { article }
    },
    methods: {
    	formatDate(date) {
      		const options = { year: 'numeric', month: 'long', day: 'numeric' }
      		return new Date(date).toLocaleDateString('en', options)
    	}
 	}

  }
</script>

<template>
  <article class="m-12">
    <div>
    <a href="" class="">&crarr; Back</a>
    <p class="font-thin float-right">Published {{ formatDate(article.createdAt) }}, last updated {{ formatDate(article.updatedAt) }}</p>
    </div>
    <header class="p-12 py-40 text-center text-white my-10 space-y-20" v-bind:class="article.bg">
      <div class="max-w-4xl mx-auto">
  	   <h1 class="text-4xl font-thin">{{ article.title }}</h1>
      </div>
    </header>


    <div v-if="article.archived" class="border-t-4 rounded-b px-4 py-3 shadow-md my-3" role="alert">
      <div class="flex">
        <div class="py-1"><svg class="fill-current h-6 w-6 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
        <div>
          <p class="font-bold">This article was published a really long time ago.</p>
          <p class="text-sm">Its value then was likely questionable. Its value now is certainly pure nostalgia.</p>
        </div>
      </div>
    </div>


    <nuxt-content class="max-w-4xl mx-auto space-y-6" :document="article" />
  </article>
</template>



<!--
<template>
  <div class="m-12 space-y-8">
    <div class="space-y-2">
      <p>Here things are written. The value of the things is questionable.</p>
    </div>
    <ul>
      <li v-for="article of articles" :key="article.slug" class="p-12 text-5xl my-3" v-bind:class="article.bg">
        <NuxtLink :to="{ name: 'slug', params: { slug: article.slug } }">
          <div>
            <h2>{{ article.title }} bg: {{ article.bg }}</h2>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
-->
'use strict';

/*document.getElementById('test-button').addEventListener('click', function(){
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
});*/
{
const titleClickHandler = function(event) {
  event.preventDefault();
  const clickedElement = this;
  const articleSelector = clickedElement.getAttribute("href");
  const targetArticle = document.querySelector(articleSelector);
  console.log('Link was clicked!');
  //console.log(event);

      /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

      /* add class 'active' to the clicked link */
    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active')

      /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

      /* get 'href' attribute from the clicked link */
    console.log(articleSelector);


      /* find the correct article using the selector (value of 'href' attribute) */
    console.log(targetArticle);

      /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks() {

  /* remove contents of titleList */
   const titleList = document.querySelector(optTitleListSelector);
   function clearMessages() {
        titleList.innerHTML = '';
   }
   clearMessages()

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector);
  let html ='';

  for (let article of articles) {

    /* get the article id */
    const articleId = article.getAttribute("id");
    //console.log(articleId);

    /* find the title element and get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    //console.log(linkHTML);

    /* insert link into titleList */
    html = html + linkHTML;
    //console.log(html);
   }

   titleList.innerHTML = html;

   const links = document.querySelectorAll('.titles a');
   //console.log(links);

   for (let link of links) {
    link.addEventListener('click', titleClickHandler);
   }

}

generateTitleLinks();

function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {

    /* find tags wrapper */
    const titleList = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute("data-tags");

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      //console.log(tag);
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

      /* add generated code to html variable */
      html =  html + linkHTML + ' ';
     // console.log(html);

    /* END LOOP: for each tag */
     }
    /* insert HTML of all the links into the tags wrapper */
     titleList.innerHTML = html;

  /* END LOOP: for every article: */
  }
}

generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute("href");

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.split('-')[1];
  //const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (let activeTagLink of activeTagLinks) {
    /* remove class active */
    activeTagLink.classList.remove('active');
  /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const allTagLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let allTagLink of allTagLinks) {
    /* add class active */
    allTagLink.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
  }

function addClickListenersToTags(){
  /* find all links to tags */
  const allLinks = document.querySelectorAll('a[href^="#tag-"]')
  /* START LOOP: for each link */
  for (let allLink of allLinks) {
    /* add tagClickHandler as event listener for that link */
   allLink.addEventListener('click', tagClickHandler);
   }
  /* END LOOP: for each link */
}
addClickListenersToTags();
console.log(addClickListenersToTags);

}

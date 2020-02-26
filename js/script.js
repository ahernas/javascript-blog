'use strict';

/*document.getElementById('test-button').addEventListener('click', function(){
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
});*/
{
  const titleClickHandler = function(event) {
    event.preventDefault();
    const clickedElement = this;
    const articleSelector = clickedElement.getAttribute('href');
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
    clickedElement.classList.add('active');

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
  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';
  const optArticleTagsSelector = '.post-tags .list';
  const optArticleAuthorSelector = '.post .post-author';
  const optTagsListSelector = '.tags.list';
  const optCloudClassCount = 5;
  const optCloudClassPrefix = 'tag-size-';
  const optAuthorsListSelector = '.authors .list';


  function generateTitleLinks (customSelector = '') {

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);

    function clearMessages() {
      titleList.innerHTML = '';
    }
    clearMessages();

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    let html ='';

    for (let article of articles) {

      /* get the article id */
      const articleId = article.getAttribute('id');
      //console.log(articleId);

      /* find the title element and get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      //console.log(linkHTML);

      /* insert link into titleList */
      html = html + linkHTML;
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    //console.log(links);

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }

  }

  generateTitleLinks();

  function calculateTagsParams(tags) {
    const params = {'max' : 0, 'min' : 999999};

    for (let tag in tags) {

      if (tags[tag] > params.max) {
        params.max = tags[tag];
      }
      if (tags[tag] < params.min) {
        params.min = tags[tag];
      }
      console.log(tag + ' is used ' + tags[tag] + ' times');
    }
    return params;
  }

  function calculateTagClass(count,params) {

    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );

    return optCloudClassPrefix + classNumber;
  }

  function generateTags() {

    /* [NEW] create a new variable allTags with an empty array */
    let allTags = {};

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for (let article of articles) {

      /* find tags wrapper */
      const titleList = article.querySelector(optArticleTagsSelector);

      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');

      /* START LOOP: for each tag */
      for (let tag of articleTagsArray) {

        /* generate HTML of the link */
        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

        /* add generated code to html variable */
        html =  html + linkHTML + ' ';

        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags[tag]) {

          /* [NEW] add tag to allTags object */
          allTags[tag] = 1;

        } else {
          allTags[tag]++;
        }

        /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      titleList.innerHTML = html;

      /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags');
    //console.log(tagList);

    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);

    /* [NEW] create variable for all links HTML code */
    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){
    /* [NEW] generate code of a link and add it to allTagsHTML */

      allTagsHTML += '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a></li>';

      /* [NEW] END LOOP: for each tag in allTags: */
    }
    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
  }


  generateTags();

  function tagClickHandler(event){
  /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

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
    const allLinks = document.querySelectorAll('a[href^="#tag-"]');

    /* START LOOP: for each link */
    for (let allLink of allLinks) {
    /* add tagClickHandler as event listener for that link */
      allLink.addEventListener('click', tagClickHandler);
    }
  /* END LOOP: for each link */
  }

  addClickListenersToTags();

  function generateAuthors () {

    let allAuthors = {};
    const articles = document.querySelectorAll(optArticleSelector);

    for (let article of articles) {

      const titleList = article.querySelector(optArticleAuthorSelector);
      let html = '';
      const articleAuthors = article.getAttribute('data-author');
      const linkHTML = '<li><a href="#author-' + articleAuthors + '">' + articleAuthors + '</a></li>';
      html = html + linkHTML;

      if (!allAuthors[articleAuthors]) {
        allAuthors[articleAuthors] = 1;
      } else {
        allAuthors[articleAuthors]++;
      }

      titleList.innerHTML = html;
    }

    const authorList = document.querySelector('.authors');
    let allAuthorsHTML = '';

    for (let articleAuthors in allAuthors) {
      allAuthorsHTML += '<li><a href="#author-' + articleAuthors + '">' + articleAuthors + '</a>(' + allAuthors[articleAuthors] + ')</li>';
    }

    authorList.innerHTML = allAuthorsHTML;
  }
  generateAuthors();

  function authorClickHandler(event) {

    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const author = href.split('-')[1];
    const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');

    for (let activeAuthorLink of activeAuthorLinks) {
      activeAuthorLink.classList.remove('active');
    }

    const allAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');

    for (let allAuthorLink of allAuthorLinks) {
      allAuthorLink.classList.add('active');
    }

    generateTitleLinks('[data-author ="' + author + '"]');
  }

  function addClickListenersToAuthors() {

    const allLinks = document.querySelectorAll('a[href^="#author-"]');

    for (let allLink of allLinks) {
      allLink.addEventListener('click', authorClickHandler);
    }
  }
  addClickListenersToAuthors();
}


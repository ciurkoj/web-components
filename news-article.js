class NewsArticle extends HTMLElement{
  title = '';
  description = '';
  url = '';
  urlToImage = '';

    constructor(){
        super();
        this.attachShadow({mode:'open'})
    }

    static get observedAttributes() {
        return ['title', 'description', 'url', 'urltoimage'];
      }
      
      connectedCallback() {
        this.render();
      }
      
      attributeChangedCallback(name, oldValue, newValue) {
        if (this.isConnected && newValue != null) {
          switch (name) {
            case 'title':
              this.title = newValue || 'NO TITLE';
              break;
            case 'description':
              this.description = newValue || '';
              break;
            case 'url':
              this.url = newValue || '/';
              break;
            case 'urltoimage':
              this.urlToImage = newValue;
              break; 
          }
      
          this.render()
        }
      }

      get style() {
        return `
            <style>
                :host {
                    display: block;
                }
                
                :host * {
                    box-sizing: border-box;
                }
                
                .news-article {
                    max-width: var(--news-article-width, 300px);
                    height: var(--news-article-height, auto);
                    padding: 10px 10px 25px;
                    background: #f6f6f6;
                    border-radius: 5px;
                    position: relative;
                    overflow: hidden;
                }
                
                .news-article .urlToImage {
                    background: var(--news-article-thumb-bg, #ddd);
                    width: calc(100% + 20px);
                    height: 150px;
                    margin-bottom: 10px;
                    margin-top: -10px;
                    margin-left: -10px;
                    overflow: hidden;
                    position: relative;
                }
                
                .news-article .urlToImage img:not([src=""]) {
                    object-fit: cover;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                }
                
                .news-article .urlToImage img[src=""] {
                    display: none;
                }
                
                .news-article h2 {
                    margin: 0;
                    padding: 0 10px;
                    font-family: sans-serif;
                    font-size: 1.2rem;
                    line-height: 135%;
                }
                
                .news-article p {
                    font-size: 0.8rem;
                    line-height: 150%;
                    color: #444;
                    padding: 0 10px;
                }
                
                .news-article .url:any-url {
                    font-size: 0.9rem;
                    text-decoration: none;
                    font-weight: 900;
                    letter-spacing: 0.05rem;
                    color: #0a66a8;
                    text-transform: capitalize;
                    border-bottom: 1px solid #222;
                    margin-left: 10px;
                }

                img {
                    max-width: 100%;
                    max-height: 100%;
                }
            </style>
          `
      }

      get template() {
        return `
          <div class="news-article">
             <div class="urlToImage">
                  <img src="${this.urlToImage ? this.urlToImage : ''}">
              </div>
             <h2>${this.title}</h2>
             <p>${this.description}</p>
             <slot name="url"><a href="${this.url}" class="url">Read more</a></slot>
          </div>
        `;
        }
    
      render() {
        this.shadowRoot.innerHTML = `${this.style}${this.template}`;
      }
    }

customElements.define('news-article', NewsArticle);

class AIImage extends HTMLImageElement {
  static get observedAttributes() {
    return ["data-fallback-src", "src"]
  }

  private _originalSrc: string | null = null
  private svgPlaceholder: string | null = null

  constructor() {
    super()

    const ph_w = super.width || 10
    const ph_h = super.height || 10
    this.svgPlaceholder = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${ph_w} ${ph_h}"><rect width="${ph_w}" height="${ph_h}" fill="#ddd"/></svg>`
    //  this.addEventListener("error", () => this.handleLoadError())
    //this.addEventListener("click", () => this.handleClick())
    this._fallbackSrc = this.onerror
    this._originalSrc = this.getAttribute("src") // Use internal property
    super.src =
      "data:image/svg+xml;utf8," + encodeURIComponent(this.svgPlaceholder) ||
      ("" as any)

    setTimeout(() => {
      super.src = "https://picsum.photos/200/300"
    }, 1000)
  }

  get src(): string {
    return this._originalSrc || "" // Return internal value
  }

  set src(value: string) {
    if (this._originalSrc !== value && this.src !== undefined) {
      super.src = value // Update internal value
    }
  }

  // get fallbackSrc(): string | null {
  //   return this._fallbackSrc
  // }

  set fallbackSrc(value: string | null) {
    this._fallbackSrc = value
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    // if (oldValue === newValue) return // Prevent unnecessary updates
    // if (name === "data-fallback-src") {
    //   this.fallbackSrc = newValue
    // } else if (name === "src") {
    //   this.style.opacity = "1"
    //   //  this.src = newValue // This will not trigger the image to load
    // }
  }

  //handleLoadError(): void {
  // if (this.fallbackSrc) {
  //  super.src = this.fallbackSrc // Use super.src to change the image
  // }
  //  }

  handleClick(): void {
    console.log("AI image clicked!")
    if (this.fallbackSrc) {
      super.src = this.fallbackSrc // Use super.src to change the image
    }
  }
}

customElements.define("ai-image", AIImage, { extends: "img" })

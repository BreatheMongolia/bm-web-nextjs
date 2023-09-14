import {urls, enUrls} from "./urls";

export const getLanguage = (): string => {
    //getting the current language from the localStorage
    let language
    try {
        language = localStorage.getItem('language') || null
      } catch (error) {}
    
    return language
}

export const appendLanguageUrlString = (nav: string): string => {
    //getting the current language from the localStorage
    let language = localStorage.getItem("language")

    if (language === "eng") {
        return enUrls[nav]
    } else {
        return urls[nav]
    }
}

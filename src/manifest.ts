// https://developer.chrome.com/docs/extensions/mv3/manifest/

export namespace Manifest {
    export type Manifest = RequiredFields & RecommendedFields & OptionalFields

    type RequiredFields = {
        manifest_version: 3,
        name: string,
        version: string,
    }

    type RecommendedFields = Partial<{
        action: Action,
        default_locale: string,
        description: string,
        icons: Omit<Icon, "24" | "32">
    }>

    type OptionalFields = Partial<{
        author: string,
        automation: string,
        background: Background,
        chrome_settings_overrides: Chrome.SettingsOverrides,
        chrome_url_overrides: Chrome.UrlOverrides,
        commands: {
            [K: string]: Command
        },
        content_capabilities: string,

    }>

    type Action = Partial<{
        default_icon: Omit<Icon, "48" | "128">,
        default_title: string,
        default_popup: string
    }>

    type IconSize = 16 | 24 | 32 | 48 | 128
    type Icon = {
        [K in IconSize]?: string
    }

    type Background = {
        service_worker: string,
        // to include the service worker as an ES Module, which allows you to import further code.
        type?: "module"
    }

    type Platform = "windows" | "mac" | "chromeos" | "linux"

    type Command = {
        suggested_key: string | Partial<{
            [K in "default" | Platform]: string
        }>
        description: string,
        global: boolean
    }

    type ContentScript = Partial<{
        matches: string[],
        exclude_matches: string[],
        include_globs: string[],
        exclude_globs: string[],
        js: string[],
        css: string[],
        run_at: DocumentState,
        all_frames: boolean
    }>

    type DocumentState = "document_idle" | "document_start" | "document_end"

    export namespace Chrome {
        export type SettingsOverrides = {
            homepage: string,
            search_provider: Partial<SearchProvider>,
            startup_pages: string[]
        }

        export type UrlOverrides = {
            /*
            TODO: research https://developer.chrome.com/docs/extensions/mv3/override/
            in this page, explain For _pageToOverride_, substitute one of the following
            - bookmarks
            - history
            - newTab

            but in example, substitute "myPage.html"
             */
            pageToOverride: string | "bookmarks" | "history" | "newTab"
        }

        type SearchProvider = {
            name: string,
            keyword: string,
            search_url: string,
            favicon_url: string,
            suggest_url: string,
            instant_url: string,
            image_url: string,
            search_url_post_params: string,
            suggest_url_post_params: string,
            instant_url_post_params: string,
            image_url_post_params: string,
            alternate_urls: string[],
            encoding: string,
            is_default: boolean
        }
    }
}
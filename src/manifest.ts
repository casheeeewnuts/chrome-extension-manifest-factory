// https://developer.chrome.com/docs/extensions/mv3/manifest/

export namespace Manifest {
    export type Json = RequiredFields & RecommendedFields & OptionalFields

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
        content_capabilities: any, // TODO remove any
        content_scripts: ContentScript[],
        content_security_policy: {
            extension_pages: string[],
            sandbox:
                string
                | "self"
                | "none"
                | "http://localhost"
                | "http://127.0.0.1"
        },
        converted_from_user_script: any, // TODO remove any
        cross_origin_embedder_policy: {
            value: string | "require-corp"
        },
        cross_origin_opener_policy: {
            value: string | "same-origin"
        },
        current_locale: any, // TODO remove any
        declarative_net_request: any, // TODO remove any
        devtools_page: string,
        differential_fingerprint: string,
        event_rules: Event.Rule[],
        externally_connectable: {
            matches: string[]
        },
        file_browser_handlers: FileBrowserHandler[],
        file_system_provider_capabilities: {
            configurable?: boolean,
            watchable?: boolean,
            multiple_mounts?: boolean,
            source?: "file" | "device" | "network"
        },
        homepage_url: string
        host_permissions: Chrome.Permission[],
        import: Module[],
        incognito: "spanning" | "split" | "not_allowed",
        input_components: string,
        key: string,
        minimum_chrome_version: string,
        nacl_modules: NaclModule[]
        natively_connectable: string,
        oauth2: any, //TODO remove any
        offline_enabled: boolean,
        omnibox: {
            keyword: string,
        },
        optional_permissions: Chrome.Permission[],
        options_page: string,
        options_ui: {
            page: string,
            open_in_tab: boolean
        }
        permissions: Chrome.Permission,
        platforms: any, // TODO remove any
        replacement_web_app: any // TODO remove any
        requirements: {
            "3D"?: {
                features: string[]
            },
            plugins?: {
                [K: string]: boolean
            }
        },
        sandbox: {
            pages: string[],
            // default content security policy is "sandbox allow-scripts allow-forms allow-popups allow-modals; script-src 'self' 'unsafe-inline' 'unsafe-eval'; child-src 'self';"
            content_security_policy?: string
        },
        short_name: string,
        storage: {
            // declared as JSON Schema https://developer.chrome.com/docs/extensions/mv3/manifest/storage/
            managed_schema: string
        },
        system_indicator: any, // TODO remove any
        tts_engine: {
            voices: Chrome.Tts.Voice[]
        },
        update_url: string,
        version_name: string,
        web_accessible_resources: WebAccessibleResource[]
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
    type Module = {
        id: string,
        minimum_version?: string
    }

    type NaclModule = {
        path: string,
        mime_type: string
    }

    type FileBrowserHandler = {
        id: string,
        default_title: string,
        file_filters: string[]
    }

    type WebAccessibleResource = {
        resources: string[],
        matches: string[],
        extension_ids: string[],
        use_dynamic_url?: boolean
    }

    namespace Event {
        export type Rule = {
            event: string,
            actions: Action[]
            conditions: Condition
        }

        interface Action {
            type: string
        }

        interface Condition {
            type: string,
            css: string[]
        }
    }

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

        // declared at https://developer.chrome.com/docs/extensions/mv3/declare_permissions/#manifest
        export type Permission =
            "activeTab"
            | "alarms"
            | "background"
            | "bookmarks"
            | "browsingData"
            | "certificateProvider"
            | "clipboardRead"
            | "clipboardWrite"
            | "contentSettings"
            | "contextMenus"
            | "cookies"
            | "debugger"
            | "declarativeContent"
            | "declarativeNetRequest"
            | "declarativeNetRequestFeedback"
            | "declarativeWebRequest"
            | "desktopCapture"
            | "documentScan"
            | "downloads"
            | "enterprise.deviceAttributes"
            | "enterprise.hardwarePlatform"
            | "enterprise.networkingAttributes"
            | "enterprise.platformKeys"
            | "experimental"
            | "fileBrowserHandler"
            | "fileSystemProvider"
            | "fontSettings"
            | "gcm"
            | "geolocation"
            | "history"
            | "identity"
            | "idle"
            | "loginState"
            | "management"
            | "nativeMessaging"
            | "notifications"
            | "pageCapture"
            | "platformKeys"
            | "power"
            | "printerProvider"
            | "printing"
            | "printingMetrics"
            | "privacy"
            | "processes"
            | "proxy"
            | "scripting"
            | "search"
            | "sessions"
            | "signedInDevices"
            | "storage"
            | "system.cpu"
            | "system.display"
            | "system.memory"
            | "system.storage"
            | "tabCapture"
            | "tabGroups"
            | "tabs"
            | "topSites"
            | "tts"
            | "ttsEngine"
            | "unlimitedStorage"
            | "vpnProvider"
            | "wallpaper"
            | "webNavigation"
            | "webRequest"
            | "webRequestBlocking"

        export namespace Tts {
            type Event = "start" | "end" | "marker"

            export type Voice = {
                voice_name: string,
                lang: string,
                event_types: Event[]
            }
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
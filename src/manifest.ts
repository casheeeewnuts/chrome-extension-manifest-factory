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
        background: Background
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
}
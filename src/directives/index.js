import waterMark from "./waterMark"

export default {
    install(app) {
        app.directive(waterMark.name, waterMark.directives)
    }
}
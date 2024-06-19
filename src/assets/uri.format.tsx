export const UriToScreenFormat = (uri: string) => {
    return uri.replace(/([A-Z])/g, ' $1').replace('_', ' ').replace('/', ' ').trim().toLowerCase().replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); })
}
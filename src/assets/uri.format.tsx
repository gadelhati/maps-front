export const UriToScreenFormat = (uri: string) => {
    return uri.replace(/([A-Z])/g, ' $1').replaceAll('_', ' ').replaceAll('/', ' ').trim().toLowerCase().replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); })
}
export default async function serveOfflineData(path: string) {

    return import(`../public/${path}`, {
        assert: { type: "json" }
    }).then(data => data.default)
}

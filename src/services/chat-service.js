export default class ChatService {
    _apiBase = '';

    async getReply(message, author) {
        const answer = await fetch(this._apiBase, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: this._createJson(message, author)
        });
        return answer.json();
    }

    _createJson (message, author) {
        const body = {
            message,
            author
        };
        let jsn = JSON.stringify(body);
        console.log(jsn);
        return jsn;
    }
}

export class TranslatePos {
    title: string = '';
    submit: string = '';
    constructor(title?, submit?) {
        this.title = title;
        this.submit = submit;
    }
}

export interface Translations {
    add: TranslatePos;
    edit: TranslatePos;
}

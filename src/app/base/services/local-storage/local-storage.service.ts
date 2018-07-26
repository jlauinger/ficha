import {Injectable} from '@angular/core';

@Injectable()
export class LocalStorageService {

    public getObject(key: string): any {
        return JSON.parse(localStorage.getItem(key));
    }

    public setObject(key: string, data: any) {
        localStorage.setItem(key, JSON.stringify(data));
    }
}

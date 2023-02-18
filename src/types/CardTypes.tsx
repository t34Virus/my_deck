export interface CardType {
    [key: string]: {
        name: string;
        image_path: string;
        description: string;
        upright: Array<string>;
        reverse: Array<string>;
    } 
}
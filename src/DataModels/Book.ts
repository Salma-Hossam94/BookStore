interface Book {
    id: string,
    title: string;
    authors?: string[];
    categories: string[];
    imageLinks?: ImageLink;
    shelf?: string;
}

interface ImageLink {
    smallThumbnail?: string;
}

export default Book
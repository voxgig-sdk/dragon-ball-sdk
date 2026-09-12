export interface Character {
    affiliation?: string;
    deletedAt?: string;
    description?: string;
    gender?: string;
    id?: number;
    image?: string;
    ki?: string;
    maxKi?: string;
    name?: string;
    originPlanet?: Record<string, any>;
    race?: string;
    transformations?: any[];
}
export interface CharacterLoadMatch {
    id: number;
}
export interface CharacterListMatch {
    affiliation?: string;
    limit?: number;
    name?: string;
    page?: number;
    race?: string;
}
export interface Planet {
    deletedAt?: string;
    description?: string;
    id?: number;
    image?: string;
    isDestroyed?: boolean;
    name?: string;
}
export interface PlanetLoadMatch {
    id: number;
}
export interface PlanetListMatch {
    limit?: number;
    name?: string;
    page?: number;
}
export interface Transformation {
    deletedAt?: string;
    id?: number;
    image?: string;
    ki?: string;
    name?: string;
}
export interface TransformationLoadMatch {
    id: number;
}
export interface TransformationListMatch {
    limit?: number;
    page?: number;
}

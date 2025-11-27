export interface MenuItem {
    id: number;
    label: string;
    icon?: string;
    link?: string;
    isTitle?: boolean;
    role?: string;
    badge?: {
        text: string;
        class?: string;
    };
    subItems?: MenuItem[];
    parentId?: number;
}

export interface IHeader {
    title: string,
    key: string,
    width?: number,
    sortable?: boolean,
    filterable?: boolean,
    asc?: boolean,
    dynamicCellComponent?: any,
    className?: string,
}
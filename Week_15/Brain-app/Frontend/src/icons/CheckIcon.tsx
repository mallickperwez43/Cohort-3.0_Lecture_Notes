import { iconSizeVariants, type IconProps } from "."

export const CheckIcon = ({ size }: IconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={iconSizeVariants[size]} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <polyline points="20 6 9 17 4 12" />
        </svg>
    )
}
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Converts a string to "Capital Case", ensuring only the first letter is uppercase.
export function capitalizeFirstLetter(str: string): string {
  return str ? str[0].toUpperCase() + str.slice(1).toLowerCase() : str
}

// Converts a string to "Sentence Case", handling camelCase and snake_case.
export function toTitleCase(str: string): string {
  return str
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/([A-Z])/g, " $1") // Add space before uppercase letters
    .toLowerCase() // Convert entire string to lowercase
    .replace(/^\w/, (c) => c.toUpperCase()) // Capitalize the first letter
    .replace(/\s+/g, " ") // Remove extra spaces
    .trim() // Trim whitespace from start and end
}

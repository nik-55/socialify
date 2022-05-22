
export function empty_validation(input_array: HTMLInputElement[]) {
    if (input_array.length === 0) return false;
    for (let i = 0; i < input_array.length; i++)
        if (input_array[i].value === "") return false;
    return true;
}

export function clean_field(input_array: HTMLInputElement[]) {
    for (let i = 0; i < input_array.length; i++)  input_array[i].value = "";
}


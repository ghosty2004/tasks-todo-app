export const capitalizeFirstLatter = (str: string) => {
    const [first, ...rest] = str;
    return first.toUpperCase() + rest.join("");
};

export const findChangedProperties = (original: any, modified: any) => {
    const changedProperties: Record<
        string,
        {
            oldValue: any;
            newValue: any;
        }
    > = {};

    for (const key in modified) {
        if (modified.hasOwnProperty(key)) {
            if (original[key] !== modified[key]) {
                changedProperties[key] = {
                    oldValue: original[key],
                    newValue: modified[key],
                };
            }
        }
    }

    return Object.entries(changedProperties).reduce((acc, [key, value]) => {
        // @ts-ignore
        if (value.newValue !== value.oldValue) acc[key] = value.newValue;
        return acc;
    }, {});
};

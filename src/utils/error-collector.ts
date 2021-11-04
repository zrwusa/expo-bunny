// todo
export const errors: Error[] = [];

export const popError = () => {
    return errors.pop();
};

export const addError = (error: Error) => {
    return errors.push(error);
};

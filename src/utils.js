export const waitForPromises = async (promisesArray, onSuccess) => {
  try {
    const promises = await Promise.allSettled(promisesArray);
    const promisesStatus = promises.map(({ value }) => value.success);

    const everyPromiseSucceed = promisesStatus.every(status => status);

    if (everyPromiseSucceed) onSuccess();
  } catch (error) {
    console.error(error);
  }
};

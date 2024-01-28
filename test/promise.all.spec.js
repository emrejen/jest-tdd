describe('Promise all test suite', () => {
  const task = (time) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(time);
      }, time);
    });
  };
  const tasks = [task(100), task(500), task(800)];
  it.skip('should show the result from the tasks', async () => {
    expect(await CustomPromise.all(tasks)).toEqual([100, 500, 800]);
  });

  it.skip('should be able to handle reject 1', async () => {
    const task = new Promise((resolve, reject) => {
      setTimeout(reject('Failed operation 1'), 100);
    });
    const tasks = [task];
    try {
      await CustomPromise.all(tasks);
    } catch (e) {
      expect(e).toEqual('Failed operation 1');
    }
  });

  it.skip('should be able to handle reject 2', async () => {
    const tasks = [Promise.resolve('Failed operation 2')];
    try {
      await CustomPromise.all(tasks);
    } catch (e) {
      expect(e).toEqual('Failed operation 2');
    }
  });

  it.skip('should catch the first error', async () => {
    const tasks = [
      Promise.resolve('success'),
      Promise.resolve('Failed operation 1'),
      Promise.resolve('Failed operation 2'),
    ];
    try {
      await CustomPromise.all(tasks);
    } catch (e) {
      expect(e).toEqual('Failed operation 1');
    }
  });
});

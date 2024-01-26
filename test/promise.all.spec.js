
const CustomPromise = {
    all: (promises) => {
        return new Promise((resolve, reject) => {
            const results = [];
    
            if (promises.length === 0) {
                resolve(results);
                return;
            }
    
            let pending = promises.length;
    
            promises.forEach((promise, idx) => {
                Promise.resolve(promise).then((value) => {
                    results[idx] = value;
                    pending--;
                    if (pending === 0) {
                        resolve(results);
                    }
                }, reject);
            });
        });
    }
}


describe('Promise all test suite', () => {
    const task = time => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(time);
            }, time);
        });
    }
    const tasks = [task(100), task(500), task(800)];
    it('should show the result from the tasks', async () => {
        expect(await CustomPromise.all(tasks)).toEqual([100, 500, 800]);
    });

    it('should be able to handle reject 1', async () => {
        const task = new Promise((resolve, reject) => {
            setTimeout(reject('Failed operation 1'), 100);
        }); 
        const tasks = [task];
        try {
            await CustomPromise.all(tasks);
        } catch(e) {
            expect(e).toEqual('Failed operation 1');
        }
    });

    it('should be able to handle reject 2', async () => {
        const tasks = [Promise.resolve('Failed operation 2')];
        try {
            await CustomPromise.all(tasks);
        } catch(e) {
            expect(e).toEqual('Failed operation 2');
        }
    });

    it('should catch the first error', async () => {
        const tasks = [Promise.resolve('success'), Promise.resolve('Failed operation 1'), Promise.resolve('Failed operation 2')];
        try {
            await CustomPromise.all(tasks);
        } catch(e) {
            expect(e).toEqual('Failed operation 1');
        }
    });
});


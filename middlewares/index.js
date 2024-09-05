import authentication from "./authentication";
import authorization from "./authorization";
import roleBaseRewrite from "./role-base-rewrite";

class MiddlewareChain {
    constructor(...middlewares) {
        this.run = this.run.bind(this);
        this.next = this.next.bind(this);

        this.chain = middlewares ?? [];
        this.current = 0;
    }

    use(...middlewares) {
        this.chain.push(...middlewares);
        return this;
    }

    async next(request, response) {
        this.current++;
        if (this.current >= this.chain.length) return response;

        return await this.run(request, response);
    }

    async run(request, response) {
        if (this.chain.length == 0) {
            return response;
        }

        const middleware = this.chain[this.current];

        return await middleware(request, response, this.next);
    }
}

export default async function createMiddlewareChain(request, response) {
    const chain = new MiddlewareChain(authentication, authorization, roleBaseRewrite);

    return await chain.run(request, response);
}

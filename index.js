const core = require("@actions/core");
const { request } = require("@octokit/request");

async function run() {
    try {
        const token = core.getInput("token");
        const eventType = core.getInput("event-type");

        core.debug(`Event type: ${eventType}`);

        // get owner of the current repository
        const owner = process.env.GITHUB_REPOSITORY.split('/')[0];
        core.debug(`Owner: ${owner}`);

        // get repository list for this owner
        const result = await request(`GET /users/${owner}/repos`);
        const repositories = result.data.map(repo => repo.name);

        // send the event to all repositories
        repositories.forEach(repository => {
            core.info(`Send event to repository: ${repository}`);
            request(
                `POST /repos/${owner}/${repository}/dispatches`,
                {
                    headers: {
                        authorization: `token ${token}`
                    },
                    mediaType: {
                        previews: ['everest']
                    },
                    event_type: `${eventType}`
                }
            );
        });

    } catch (error) {
        core.setFailed(error.message);
    }
}

run();

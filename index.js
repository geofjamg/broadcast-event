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

        const additionalOrganizations = core.getInput("organizations");
        core.debug(`Organizations: ${additionalOrganizations}`);

        const organizations = additionalOrganizations ? [owner, ...additionalOrganizations.split(' ')] : [owner];
        core.info(`Organizations: ${organizations}`);

        for (const index in organizations) {
            const organization = organizations[index];

            // get repository list for this organization
            const result = await request(`GET /users/${organization}/repos{?per_page}`,
                {
                    per_page: "100"
                });
            const repositories = result.data.map(repo => repo.name);

            // send the event to all repositories
            repositories.forEach(repository => {
                core.info(`Send event to repository: ${organization}/${repository}`);
                request(
                    `POST /repos/${organization}/${repository}/dispatches`,
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
        }
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();

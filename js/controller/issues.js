
import { Octokit } from "https://cdn.skypack.dev/@octokit/core";

document.addEventListener('DOMContentLoaded', () => {
    const octokit = new Octokit({
      auth: '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'
    });

    const form = document.getElementById('issuesform');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const title = document.getElementById('inputtittle').value;
      const body = document.getElementById('inputbody').value;
      const assignees = [document.getElementById('inputassigness').value];
      const milestone = parseInt(document.getElementById('inputmilestone').value);
      const labels = [document.getElementById('inputlabels').value];

      try {
        const response = await octokit.request('POST /repos/dtiulbi/questionstik/issues', {
          owner: 'dtiulbi',
          repo: 'questionstik',
          title,
          body,
          assignees,
          milestone,
          labels,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          }
        });
        console.log('Issue created:', response);
      } catch (error) {
        console.error('Failed to create issue:', error);
      }
    });
  });
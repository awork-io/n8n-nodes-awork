# n8n-nodes-awork

This is an n8n community node that lets you automate workflows with [awork](https://www.awork.com/), a modern project management tool. It provides seamless integration between awork and n8n, allowing you to manage projects, tasks, time entries, documents, and company/client data within your automation workflows.

## Installation

### n8n Cloud
1. Select **+** on your canvas and type **awork**
2. Find **awork** in the **More from the community** section
3. Select **install**

Follow the [official installation guide](https://docs.n8n.io/integrations/community-nodes/installation/verified-install/) for n8n community nodes.

### Self-Hosted Instance
1. Navigate to **Settings > Community Nodes**
2. Select **Install**
3. Enter `n8n-nodes-awork` in **Enter npm package name**
4. Select **Install**
5. **Restart your n8n instance** after installation

## Authentication

To use the awork node, you'll need API credentials from awork:

1. **Create an awork account** at [awork.com](https://www.awork.com/) if you don't have one
2. **Generate an API key** by following the instructions in the [awork API Authentication documentation](https://developers.awork.com/authentication#api-key)
3. **In n8n**, add new credentials:
   - Select **"awork API"** from the credentials list
   - Enter your API key
   - Test the connection to ensure it's working

## Available Operations

The node supports the following operations:

| Resource | Operations |
| --- | --- |
| Projects | Create, get, list, update, delete; change status; list/create project and task statuses |
| Project tasks | Create, get, list by project, update, delete; change status; set assignees and custom fields; add tags and comments; list comments |
| Companies | Create, get, list, update, delete |
| Time entries | Create, get, list, update, delete; list by project or task |
| Documents | Create, get, list, update metadata, get/update content, delete; list by project or document space |
| Document spaces | Create, get, list, update, delete |
| Task lists (under Project) | Create, get, list, update, delete; add tasks via Project Task |
| Users | Get, list |
| Types of work (under Project Task) | Create, list |

List operations support **Return All**, **Filter By**, and **Order By**. With Return All disabled, the node retrieves the first API page; enable it to retrieve all pages.

Updates expose only the selected **Update Fields** in the request, including explicit `false`, `0`, or empty text values. Company, project, and task updates require the name; time-entry updates require the type of work ID and IANA timezone, as specified by the API. Supply the current values when changing other fields.

Time-entry creation uses separate UTC date and time fields (time format `HH:mm:ss`), a user ID, a type of work ID, and the entry's original IANA timezone. For a completed entry, add **Duration (Seconds)** or an end date/time under **Additional Fields**. The node sends UTC fields only, so it does not mix the API's UTC and local date/time groups.

Documents accept HTML or Markdown text. The node uploads content as a UTF-8 file using the API's required multipart format. Use **Update Document** for metadata and **Update Document Content** for the text. Creating a document supports a project, document space, task, or private document.

Project and task deletion preserve time entries by default. Company deletion defaults to deleting only the company. Task-list deletion preserves tasks and times by default. Document deletion exposes **Also Delete Children**; document-space deletion removes its documents according to the API.

Existing operation values are preserved so saved workflows continue to work. For endpoints not exposed here, use n8n's HTTP Request node with awork API credentials. See the [awork OpenAPI specification](https://api.awork.com/openapi/v1) for the request schemas and [awork Developer Documentation](https://developers.awork.com/) for API usage.

## Example Workflows

Here are some common use cases for the awork nodes:

1. **Automated Project Creation**: Create projects in awork when new deals are won in your CRM
2. **Task Synchronization**: Sync tasks between awork and other project management tools
3. **Company Management**: Automatically create companies in awork from form submissions
4. **Status Updates**: Update task statuses based on external triggers
5. **Time Tracking**: Create and synchronize time entries from calendars or external time trackers
6. **Document Automation**: Create and update project documents from workflow results
7. **Reporting**: Extract project and task data for custom reporting dashboards

## Resources

- **awork Developer Documentation**: [developers.awork.com](https://developers.awork.com/)
- **awork Developer Forum**: [community.awork.com/c/developer-forum/17](https://community.awork.com/c/developer-forum/17)
- **n8n Documentation**: [docs.n8n.io](https://docs.n8n.io/)
- **n8n Community**: [community.n8n.io](https://community.n8n.io/)

## Support

If you encounter any issues or have questions:

- Check the [awork Developer Forum](https://community.awork.com/c/developer-forum/17) for API-related questions
- Visit the [n8n Community Forum](https://community.n8n.io/) for n8n-specific issues

## Local Development

For contributors and developers who want to test changes locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/awork-io/n8n-nodes-awork
   cd n8n-nodes-awork
   ```

2. Install dependencies and build:
   ```bash
   npm install
   npm run build
   ```

3. Link to your local n8n installation:
   ```bash
   npm link
   cd ~/.n8n/custom
   npm link n8n-nodes-awork
   ```

4. Start n8n:
   ```bash
   n8n start
   ```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

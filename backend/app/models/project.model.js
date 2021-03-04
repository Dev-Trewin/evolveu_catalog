const { Schema } = require("mongoose");

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {

      project_name: String,
      name_team_member: Array,
      team_name: String,
      cohort_num: String,
      project_num: String,
      release_date: Date,
      short_Description: String,
      description: String,
      key_feature: Array,
      screenshotId: String,
      language: Array,
      framework: Array,
      database: Array,
      repository: String,
      website_link: Array,
      extra_tools: Array,
      team_member_accounts: Array,
      link_team_member_github_page: Array,
      link_team_member_linked_page: Array,
      owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    }

  );

  const Project = mongoose.model("project", schema);
  return Project;
};



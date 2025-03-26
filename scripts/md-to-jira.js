const fs = require('fs');

function mdToJira(markdown) {
  return markdown
    .replace(/^### (.*$)/gm, 'h3. $1')
    .replace(/^## (.*$)/gm, 'h2. $1')
    .replace(/^# (.*$)/gm, 'h1. $1')
    .replace(/- \[ \] (.*$)/gm, '[ ] $1')
    .replace(/- \[x\] (.*$)/gi, '[x] $1')
    .replace(/^- (.*$)/gm, '* $1')
    .replace(/\*\*(.*?)\*\*/g, '*$1*')
    .replace(/\*(.*?)\*/g, '_$1_')
    .replace(/```([\s\S]*?)```/g, '{code}\n$1\n{code}')
    .replace(/`([^`]+)`/g, '{{ $1 }}');
}

// GitHub Action으로부터 입력 받아 파일 생성
const title = process.env.ISSUE_TITLE || 'No title';
const url = process.env.ISSUE_URL || '';
const body = process.env.ISSUE_BODY || '';

const jiraBody = mdToJira(body);
const full = `GitHub Issue 링크: ${url}\n\n${jiraBody}`;

// 결과를 파일로 저장
fs.writeFileSync('jira-description.txt', full);

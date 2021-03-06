import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Tag } from 'antd';
import ProTable, { ProColumns, TableDropdown } from '@machinaai/pro-table';
import request from 'umi-request';

interface GithubIssueItem {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: User;
  labels: Label[];
  state: string;
  locked: boolean;
  assignee?: any;
  assignees: any[];
  milestone?: any;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: any;
  author_association: string;
  body: string;
}

interface Label {
  id: number;
  node_id: string;
  url: string;
  name: string;
  color: string;
  default: boolean;
  description: string;
}

interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

const columns: ProColumns<GithubIssueItem>[] = [
  {
    title: 'Serial Number',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 72,
  },
  {
    title: 'Title',
    dataIndex: 'title',
    copyable: true,
    ellipsis: true,
    width: 200,
    hideInSearch: true,
  },
  {
    title: 'Status',
    dataIndex: 'state',
    initialValue: 'all',
    valueEnum: {
      all: { text: 'All', status: 'Default' },
      open: {
        text: 'Unresolved',
        status: 'Error',
      },
      closed: {
        text: 'Solved',
        status: 'Success',
      },
    },
  },
  {
    title: 'Sort by',
    key: 'direction',
    hideInTable: true,
    dataIndex: 'direction',
    valueEnum: {
      asc: 'Positive order',
      desc: 'Reverse order',
    },
  },
  {
    title: 'Label',
    dataIndex: 'labels',
    width: 120,
    render: (_, row) =>
      row.labels.map(({ name, id, color }) => (
        <Tag
          color={`#${color}`}
          key={id}
          style={{
            margin: 4,
          }}
        >
                    {name}
                  
        </Tag>
      )),
  },
  {
    title: 'Creation time',
    key: 'since',
    dataIndex: 'created_at',
    valueType: 'dateTime',
  },
  {
    title: 'option',
    valueType: 'option',
    dataIndex: 'id',
    render: (text, row) => [
      <a href={row.html_url} target="_blank" rel="noopener noreferrer">
                View       
      </a>,
      <TableDropdown
        onSelect={(key) => window.alert(key)}
        menus={[
          { key: 'copy', name: 'copy' },
          { key: 'delete', name: 'Delete' },
        ]}
      />,
    ],
  },
];

export default () => (
  <ProTable<GithubIssueItem>
    columns={columns}
    request={async (params = {}) => {
      const data = await request<GithubIssueItem[]>(
        'https://api.github.com/repos/ant-design/ant-design-pro/issues',
        {
          params: {
            ...params,
            page: params.current,
            per_page: params.pageSize,
          },
        },
      );
      return {
        data,
        page: params.current,
        success: true,
        total: 5713,
      };
    }}
    rowKey="id"
    dateFormatter="string"
    headerTitle="Search Table"
    search={{
      collapsed: false,
      optionRender: ({ searchText, resetText }, { form }) => {
        return (
          <>
            <a
              onClick={() => {
                form.submit();
              }}
            >
              {searchText}
            </a>{' '}
            <a
              onClick={() => {
                form.resetFields();
              }}
            >
              {resetText}
            </a>{' '}
            <a>Export</a>
          </>
        );
      },
    }}
    toolBarRender={() => [
      <Button key="3" type="primary">
        <PlusOutlined />
        New
      </Button>,
    ]}
  />
);

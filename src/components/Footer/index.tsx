import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
const Footer: React.FC = () => {
  const defaultMessage = 'Aganippe出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Navigation Page',
          title: '搜索一下吧',
          href: 'https://limestart.cn/',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <><GithubOutlined /> Aip GitHub</>,
          href: 'https://github.com/Agan-ippe',
          blankTarget: true,
        },
        {
          key: 'emm',
          title: '暂无',
          href: '',
          blankTarget: false,
        },
      ]}
    />
  );
};
export default Footer;

import * as React from 'react';

interface TestProps {
  /**
   * `visible
   */
  visible: boolean;
  children: React.ReactNode;
  /**
   * text
   */
  text?: string;
}

/**
 * My name is Test
 */
export default class Test extends React.PureComponent<TestProps> {

  static defaultProps = {
    text: 'text',
  }

  render() {
    return (
      <div>
        aaa
      </div>
    );
  }
}


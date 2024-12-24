/*
  Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

  Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except
  in compliance with the License. A copy of the License is located at

      http://aws.amazon.com/apache2.0/

  or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
  specific language governing permissions and limitations under the License.
*/

import React from 'react';
import { shallow } from 'enzyme';

import { App } from '../App';
import * as IoT from '../../lib/aws-iot';

describe('App', () => {
  IoT.attachConnectHandler = jest.fn();
  IoT.attachCloseHandler = jest.fn();
  IoT.publish = jest.fn();

  const props = {
    connectPolicy: true,
    publicPublishPolicy: true,
    publicSubscribePolicy: true,
    publicReceivePolicy: true,
    loggedIn: false,
    handleSignOut: jest.fn(),
    loggedInStatusChanged: jest.fn(),
    acquirePublicPolicies: jest.fn(),
    deviceConnected: false,
    deviceConnectedStatusChanged: jest.fn(),
    identityId: 'identity-id',
    attachMessageHandler: jest.fn(),
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App {...props} />);
  });

  describe('when logged in', () => {
    beforeAll(() => {
      props.loggedIn = true;
      sessionStorage.setItem('isLoggedIn', true);
    });

    describe('when public policies have been granted', () => {
      it('renders without crashing', () => {
        expect(wrapper).toHaveLength(1);
      });
    });

    describe('when public policies have not been granted', () => {
      beforeAll(() => {
        props.connectPolicy = false;
      });

      it('renders without crashing', () => {
        expect(wrapper).toHaveLength(1);
      });
    });
  });

  describe('when logged out', () => {
    beforeAll(() => {
      props.loggedIn = false;
      sessionStorage.setItem('isLoggedIn', false);
    });

    it('renders without crashing', () => {
      expect(wrapper).toHaveLength(1);
    });
  });
});

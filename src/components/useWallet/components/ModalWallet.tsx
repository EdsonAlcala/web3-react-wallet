import React from 'react'
import styled from 'styled-components';

import Modal from '../../Modal'

import { Wallet } from './Wallet';
import { ReactComponent as Close } from './assets/images/x.svg'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';

interface IModalWalletProps {
    isOpen: boolean
    onClose: () => void
}

const Content = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin: 0;
  padding: 0;
  width: 100%;
`

const Header = styled.div`
  position: relative;

  h5 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 400;
  }

  h5:last-child {
    margin-bottom: 0px;
  }

  h4 {
    margin-top: 0;
    font-weight: 500;
  }
`

const HeaderRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  padding: 1rem 1rem;
  font-weight: 500;
  padding: 1rem;
`

const CloseIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 14px;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`

const CloseColor = styled(Close)`
  path {
    stroke: ${({ theme }) => theme.text4};
  }
`

const Title = styled.div`

`

export const ModalWallet: React.FC<IModalWalletProps> = ({ isOpen, onClose }) => {
    const { active, account, connector, activate, error } = useWeb3React()

    return (
        <Modal
            isOpen={isOpen}
            onDismiss={onClose}
            minHeight={false}
            maxHeight={90}>
            <Content>
                <Header>
                    <HeaderRow>
                        <CloseIcon onClick={onClose}>
                            <CloseColor />
                        </CloseIcon>
                        {!error && <Title>Connect to a wallet</Title>}
                        {error && <Title>{error instanceof UnsupportedChainIdError ? 'Wrong Network' : 'Error connecting'}</Title>}
                    </HeaderRow>
                </Header>
                <Wallet />
            </Content>
        </Modal>
    )
}

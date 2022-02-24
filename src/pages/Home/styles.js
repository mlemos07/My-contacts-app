import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 32px;
`;

export const InputSearchContainer = styled.div`
  width: 100%;

  input {
    width: 100%;
    background: #fff;
    border-radius: 25px;
    border: none;
    height: 50px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
    outline: 0;
    padding: 0 16px;

    &::placeholder {
      color: #BCBCBC;
    }
  }
`;

export const Header = styled.header`
  align-items: center;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray[100]};
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent};
  margin-top: 32px;

  strong {
    font-size: 24px;
  }

  a {
    border: 2px solid ${({ theme }) => theme.colors.primary.main};
    border-radius: 4px;
    color: ${({ theme }) => theme.colors.primary.main};
    font-weight: bold;
    margin-bottom: 16px;
    padding: 8px 16px;
    text-decoration: none;
    transition: all .2s ease-in;

    &:hover {
      background: ${({ theme }) => theme.colors.primary.main};
      color: #FFF;
    }
  }
`;

export const ListHeader = styled.header`
  margin-top: 24px;

    margin-bottom: 8px;

    button {
      align-items: center;
      background: transparent;
      border: none;
      display: flex;

      span {
        margin-right: 8px;
        font-weight: bold;
        color: ${({ theme }) => theme.colors.primary.main};
      }

      img {
        transform: ${({ orderBy }) => (orderBy === 'asc' ? 'rotate(180deg)'
    : 'rotate(0deg)')};
        transition: transform .2s ease-in;
      }
    }
`;

export const Card = styled.div`
  background: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, .3);
  padding: 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & + & {
    margin-top: 16px
  }

  .info {
    .contact-name {
      display: flex;
      align-items: center;
      margin-bottom: 4px;

      small {
        color: ${({ theme }) => theme.colors.primary.main};
        background: ${({ theme }) => theme.colors.primary.lighter};
        padding: 4px;
        border-radius: 4px;
        font-weight: bold;
        margin-left: 8px;
        text-transform: uppercase;
      }
    }
    span {
      display: block;
      font-size: 14px;
      color: ${({ theme }) => theme.colors.gray[200]};
    }
  }

  .actions {
    display: flex;
    align-items: center;

    button {
      background: transparent;
      border: none;
      margin-left: 8px;

    }
  }
`;

export const ErrorContainer = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;

  .details {
    margin-left:24px;
  }

  strong {
    color: ${({ theme }) => theme.colors.danger.main};
    font-size: 22px;
    margin-bottom: 8px;
    display: block;
  }
`;

export const EmptyListContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 16px;

  p {
    color: ${({ theme }) => theme.colors.gray[200]};
    text-align: center;
    margin-top: 8px;

    strong {
      color: ${({ theme }) => theme.colors.primary.main};
    }
  }
`;

export const SearchNotFoundContainer = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: flex-start;

  span {
    color: ${({ theme }) => theme.colors.gray[200]};
    margin-left: 24px;
    word-break: break-word;
  }
`;

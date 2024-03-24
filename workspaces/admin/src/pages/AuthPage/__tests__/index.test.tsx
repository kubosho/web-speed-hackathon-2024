import { QueryClientProvider } from '@tanstack/react-query';
import { cleanup, render, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { queryClient } from '../../../lib/api/queryClient';
import { AuthPage } from '../index';

afterEach(cleanup);

vi.mock('../../../features/auth/hooks/useAuthUser', () => {
  return {
    useAuthUser: vi.fn().mockReturnValue({ data: null }),
  };
});

describe('LoginContent', () => {
  it('バリデーションエラーが表示されないこと', async () => {
    // Given
    const mailAddress = 'administrator@example.com';
    const password = 'pa5sW0rd!';
    const user = userEvent.setup();

    // When
    const { getByText, queryAllByRole } = render(
      <QueryClientProvider client={queryClient}>
        <AuthPage />
      </QueryClientProvider>,
    );
    const emailTextbox = getByText('メールアドレス');
    const passwordTextbox = getByText('パスワード');
    const submitButton = getByText('ログイン', { selector: 'button' });

    await user.click(emailTextbox);
    await user.type(emailTextbox, mailAddress);

    await user.click(passwordTextbox);
    await user.type(passwordTextbox, password);

    await submitButton.focus();

    // Then
    const alerts = await waitFor(() => queryAllByRole('alert'));
    expect(alerts).toHaveLength(0);
  });
});

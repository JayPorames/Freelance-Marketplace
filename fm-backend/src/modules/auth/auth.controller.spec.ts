import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const mockAuthService = {
      register: jest.fn(),
      login: jest.fn(),
      refreshTokens: jest.fn(),
      logout: jest.fn(),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authController = app.get<AuthController>(AuthController);
    authService = app.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });
});

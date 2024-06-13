import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { messages } from 'src/utils/messages';

export class CreateUserDto {
  @IsNotEmpty({ message: messages.isEmpty('이름') })
  @IsString({ message: messages.isString('이름') })
  @MinLength(2, { message: messages.minLength('이름', 2) })
  @MaxLength(10, { message: messages.maxLength('이름', 10) })
  name: string;

  @IsNotEmpty({ message: messages.isEmpty('비밀번호') })
  @IsString({ message: messages.isString('비밀번호') })
  @MinLength(8, { message: messages.minLength('비밀번호', 8) })
  @MaxLength(16, { message: messages.maxLength('비밀번호', 16) })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]+$/,
    {
      message:
        '비밀번호는 영문 대소문자,숫자,특수문자 중 3가지 이상 조합되어야 합니다.',
    },
  )
  password: string;

  @IsNotEmpty({ message: messages.isEmpty('전화번호') })
  @IsString({ message: messages.isString('전화번호') })
  @Matches(/^01[0-9]{1}-?[0-9]{3,4}-?[0-9]{4}$/, {
    message: '올바른 핸드폰 번호 형식이 아닙니다.',
  })
  phonenumber: string;

  @IsNotEmpty({ message: messages.isEmpty('이메일') })
  @IsString({ message: messages.isString('이메일') })
  @IsEmail({}, { message: '올바른 이메일 형식이 아닙니다.' })
  email: string;

  @IsString({ message: messages.isString('우편번호') })
  @MinLength(5, { message: messages.minLength('우편번호', 5) })
  @MaxLength(5, { message: messages.maxLength('우편번호', 5) })
  zipcode: string;

  @IsNotEmpty({ message: messages.isEmpty('주소') })
  @IsString({ message: messages.isString('주소') })
  address: string;

  @IsNotEmpty({ message: '약관에 동의해주세요.' })
  agreement: number;

  @IsNotEmpty({ message: messages.isEmpty('생년월일') })
  @IsString({ message: messages.isString('생년월일') })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: '올바른 형식(yyyy-mm-dd)으로 입력해주세요.',
  })
  birth_day: string;

  permissions_id: number;
}

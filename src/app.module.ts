import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProductStatusModule } from './product-status/product_status.module';
import { OrdersModule } from './orders/orders.module';
import { CouponsModule } from './coupons/coupons.module';
import { UsersModule } from './users/users.module';
import { CouponStatusModule } from './coupon-status/coupon-status.module';
import { CouponIssuanceModeModule } from './coupon-issuance-mode/coupon-issuance-mode.module';
import { ProductOptionsModule } from './product-options/product_options.module';
import { OrderProductsModule } from './order-products/order-products.module';
import { PointPolicyModule } from './point-policy/point-policy.module';
import { PurchasesPointStatusModule } from './purchases-point-status/purchases-point-status.module';
import { ReviewPointStatusModule } from './review-point-status/review-point-status.module';
import { ExpirationDateStatusModule } from './expiration-date-status/expiration-date-status.module';
import { CartsModule } from './carts/carts.module';
import { CartStatusModule } from './cart-status/cart-status.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ProductStatusModule,
    OrdersModule,
    CouponsModule,
    UsersModule,
    CouponStatusModule,
    CouponIssuanceModeModule,
    ProductOptionsModule,
    OrderProductsModule,
    PointPolicyModule,
    PurchasesPointStatusModule,
    ReviewPointStatusModule,
    ExpirationDateStatusModule,
    CartsModule,
    CartStatusModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

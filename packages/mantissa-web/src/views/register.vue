<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-4">
              <v-toolbar dark color="primary">
                <v-toolbar-title>{{ $t('view.register.title') }}</v-toolbar-title>
              </v-toolbar>
              <form @submit.prevent="validateBeforeSubmit" novalidate>
                <v-card-text>
                  <v-text-field
                    v-validate="'required|email'"
                    v-model="email"
                    :error-messages="errors.collect('email')"
                    prepend-icon="person"
                    name="email"
                    :label="$t('view.register.email')"
                    type="email"
                    autocomplete="username"
                    required
                    >
                  </v-text-field>
                  <v-text-field
                    v-validate="'required|min:8'"
                    v-model="password"
                    :error-messages="errors.collect('password')"
                    ref="password"
                    prepend-icon="lock"
                    name="password"
                    :label="$t('view.register.password')"
                    type="password"
                    autocomplete="new-password"
                    required
                    >
                  </v-text-field>
                  <v-text-field
                    v-validate="'required|confirmed:password'"
                    v-model="passwordConfirmed"
                    :error-messages="errors.collect('passwordConfirmed')"
                    prepend-icon="lock"
                    name="passwordConfirmed"
                    :label="$t('view.register.confirmPassword')"
                    type="password"
                    data-vv-as="password"
                    autocomplete="new-password"
                    required
                    >
                  </v-text-field>
                </v-card-text>
                <v-alert
                  :value="!!errorCode"
                  type="error"
                >
                  {{ $t(`errorCode.${errorCode}`) }}
                </v-alert>
                <v-card-actions>
                  <v-btn flat @click="$router.push({ name: 'signIn' })">{{ $t('view.register.signInButton') }}</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" type="submit" :disabled="inProcess">{{ $t('view.register.submitButton') }}</v-btn>
                </v-card-actions>
              </form>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { Action } from 'vuex-class'
  import { IRegisterInput } from '@mantissa/gql-types';

  @Component({})
  export default class RegisterView extends Vue {
    @Action('register', { namespace: 'user' })
    public register!: (input: IRegisterInput) => string;

    public email: string = '';
    public password: string = '';
    public passwordConfirmed: string = '';
    public errorCode: string = '';
    public inProcess: boolean  = false;

    public async validateBeforeSubmit(): Promise<void> {
      this.errorCode = '';

      const isValid = await this.$validator.validateAll();

      if (!isValid) {
        return;
      }

      try {
        this.inProcess = true;

        await this.register({
          email: this.email,
          password: this.password
        });
      } catch (errCode) {
        this.errorCode = errCode;
      }

      this.inProcess = false;

      this.$router.push({ name: 'operations' });
    }
  }
</script>

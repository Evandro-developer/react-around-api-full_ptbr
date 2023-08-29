class Auth {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.headers = {
      "Content-Type": "application/json",
    };
  }

  async _handleResponse(res) {
    if (!res.ok) {
      let errorMessage;

      if (res.url.endsWith("/signup") && res.status === 400) {
        errorMessage = "um dos campos foi preenchido incorretamente";
      } else if (res.url.endsWith("/signin") && res.status === 400) {
        errorMessage = "um ou mais campos não foram fornecidos";
      } else if (res.url.endsWith("/signin") && res.status === 401) {
        errorMessage = "o usuário com o e-mail especificado não foi encontrado";
      } else if (res.url.endsWith("/users/me") && res.status === 400) {
        errorMessage = "Token não fornecido ou fornecido em formato errado";
      } else if (res.url.endsWith("/users/me") && res.status === 401) {
        errorMessage = "O token fornecido é inválido";
      } else {
        const errorData = await res.json();
        errorMessage = errorData.message || res.statusText;
      }

      throw new Error(`${res.status} - ${errorMessage}`);
    }

    return res.json();
  }

  async register(email, password) {
    const response = await fetch(`${this.baseUrl}/signup`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ email, password }),
    });

    return this._handleResponse(response);
  }

  async authorize(email, password) {
    const response = await fetch(`${this.baseUrl}/signin`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ email, password }),
    });

    const data = await this._handleResponse(response);
    localStorage.setItem("token", data.token);
    return data;
  }

  async getContent() {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error(
        "400 - Token não fornecido ou fornecido em formato errado"
      );
    }

    const response = await fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: {
        ...this.headers,
        authorization: `Bearer ${token}`,
      },
    });

    const data = await this._handleResponse(response); // Obter os dados do usuário
    return data; // Retornar os dados do usuário
  }
}

const auth = new Auth("https://api.aroundfinal.com.br");

export default auth;
